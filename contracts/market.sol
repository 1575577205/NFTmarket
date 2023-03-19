// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./NFT.sol";

contract market {
    //市场拥有者
    address _marketOwner;

    //市场合约地址
    address _marketAddress;

    //注册
    mapping(address => bool) _registedSeller;
    mapping(address => bool) _registedBuyer;
    mapping(address => string) private _registedID;
    mapping(string => string) _registedName;

    //市场NFT列表
    uint[] _listedNFTs;

    //是否已上传
    mapping(uint => bool) _isListed;

    //声誉
    mapping(address => uint) _reputation;

    //已被多少人评分
    mapping(address => uint) _graded;

    //上一次交易的时间
    mapping(address => uint) _lastDealTime;

    //上一个交易对象
    mapping(address => address) _lastDealUser;

    //定时器
    mapping(address => uint) _timer;

    //前6个月的交易数
    mapping(address => uint) _lastSixMonthsDeals;

    //股份
    mapping(address => uint256) _stock;

    //总股份
    uint _totalStock;

    //NFT
    NFT _NFT;

    //设定额度
    uint STOCK = 5;

    constructor(address NFT_) {
        _marketOwner = msg.sender;
        _NFT = NFT(NFT_);
    }

    event registSuccess(address);
    event createNFTSuccess();
    event listNFTSuccess(uint);
    event unListNFTSuccess(uint);
    event transferSuccess(address from, address to, uint id, uint price);
    event gradeSuccess();
    event rewardBuyerSuccess(address seller, address buyer);
    event burnNFTSuccess(uint id);

    modifier onlyMarket() {
        require(msg.sender == _marketOwner, "Not the market!");
        _;
    }
    modifier onlySeller() {
        require(_registedSeller[msg.sender], "Not a seller!");
        _;
    }
    modifier onlyBuyer() {
        require(_registedBuyer[msg.sender], "Not a buyer!");
        _;
    }
    modifier onlyRegisted() {
        require(
            _registedBuyer[msg.sender] || _registedSeller[msg.sender],
            "Not Registed"
        );
        _;
    }
    modifier onlyNewUser() {
        require(
            !_registedBuyer[msg.sender] &&
                !_registedSeller[msg.sender] &&
                msg.sender != _marketOwner,
            "you are not the new user!"
        );
        _;
    }

    //获取ID
    function getID() public view returns (string memory) {
        return (_registedID[msg.sender]);
    }

    //是否已注册
    function isRegisted() public view returns (bool) {
        return (_registedBuyer[msg.sender] || _registedSeller[msg.sender]);
    }

    //注册成为卖家
    function registBeSeller(
        string memory id_num,
        string memory name_
    ) public payable onlyNewUser returns (bool) {
        require(msg.value >= STOCK, "Not Enough ETH to deposit!");
        _registedSeller[msg.sender] = true;

        initInfo(msg.value, msg.sender, id_num, name_);
        return true;
    }

    //注册成为买家
    function registBeBuyer(
        string memory id_num,
        string memory name_
    ) public onlyNewUser returns (bool) {
        _registedBuyer[msg.sender] = true;
        initInfo(0, msg.sender, id_num, name_);
        return true;
    }

    //是否为卖家
    function isSeller() public view returns (bool) {
        return _registedSeller[msg.sender];
    }

    //设定股份额度
    function setStockLevel(uint stock_) public onlyMarket {
        STOCK = stock_;
    }

    //初始化用户参数
    function initInfo(
        uint value_,
        address caller_,
        string memory id_num,
        string memory name_
    ) internal {
        _stock[caller_] = value_;
        _registedID[caller_] = id_num; //用户钱包地址到用户之间的映射
        _registedName[id_num] = name_; //身份证号到用户名字的映射
        _reputation[caller_] = 250; //信誉值
        _timer[caller_] = block.timestamp;
        _totalStock += value_;
        emit registSuccess(caller_);
    }

    //查询指定用户股份
    function getStock() public view returns (uint) {
        return _stock[msg.sender];
    }

    //查询总股份
    function getTotalStock() public view returns (uint) {
        return _totalStock;
    }

    //查询信誉值
    function getReputation() public view returns (uint) {
        return _reputation[msg.sender];
    }

    //取消卖家身份
    function revokeSeller(address seller_) public onlyMarket returns (bool) {
        _registedSeller[seller_] = false;
        return true;
    }

    //取消买家身份
    function revokeBuyer(address buyer_) public onlyMarket returns (bool) {
        _registedBuyer[buyer_] = false;
        return true;
    }

    //卖家铸造NFT
    function createNFT(
        uint price_,
        string memory name_,
        string memory uri_,
        string memory description_,
        uint needReputation
    ) public onlySeller {
        require(
            _lastDealUser[msg.sender] == address(0), //对上一个买家进行评价之后带能进行铸造
            "Please grade last buyer!"
        );
        _NFT.createNFT(
            msg.sender,
            price_,
            name_,
            uri_,
            description_,
            needReputation
        );
        emit createNFTSuccess();
    }

    //查询NFT信息
    function getNFTInfo(
        uint NFTId_
    )
        public
        view
        returns (
            address,
            uint,
            string memory,
            string memory,
            string memory,
            uint
        )
    {
        return _NFT.getNFTInfo(NFTId_);
    }

    //将NFT上传交易市场
    function listNFT(uint id_) public {
        require(msg.sender == _NFT.ownerOf(id_), "Not the NFT owner!");
        require(!_isListed[id_], "The NFT already listed!");
        for (uint i = 0; i < _listedNFTs.length; i++) {
            if (_listedNFTs[i] == 0) {
                _listedNFTs[i] = id_;
                _isListed[id_] = true;
                emit listNFTSuccess(id_);
                return;
            }
        }
        _listedNFTs.push(id_);
        _isListed[id_] = true;
        emit listNFTSuccess(id_);
    }

    //获取NFTList
    function getNFTList() public view returns (uint[] memory) {
        return _listedNFTs;
    }

    //将NFT下架交易市场(卖家主动下架)
    function unlistNFTByOwner(uint id_) public {
        require(
            msg.sender == _NFT.ownerOf(id_),
            "You dont have permission to unlist!"
        );
        require(_isListed[id_], "This NFT is not listed!");
        for (uint i = 0; i < _listedNFTs.length; i++) {
            if (_listedNFTs[i] == id_) {
                delete _listedNFTs[i];
                _isListed[id_] = false;
                emit unListNFTSuccess(id_);
                return;
            }
        }
        emit unListNFTSuccess(id_);
    }

    //将NFT下架交易市场(市场下架)
    function unlistNFTByMarket(uint id_) internal {
        for (uint i = 0; i < _listedNFTs.length; i++) {
            if (_listedNFTs[i] == id_) {
                delete _listedNFTs[i];
                _isListed[id_] = false;
                emit unListNFTSuccess(id_);
                return;
            }
        }
        emit unListNFTSuccess(id_);
    }

    //获取NFT是否上架交易市场
    function isListed(uint id_) public view returns (bool) {
        return _isListed[id_];
    }

    //购买NFT
    function buyNFT(uint NFTId_) public payable onlyBuyer {
        require(
            _lastDealUser[msg.sender] == address(0),
            "Please grade last seller!"
        );
        address owner = _NFT.ownerOf(NFTId_);
        uint256 price = _NFT.getPrice(NFTId_);
        require(msg.value == price, "invalid amount!");
        require(
            _reputation[msg.sender] >= _NFT.getNeedReputation(NFTId_),
            "Not enught reputation"
        );

        payable(owner).transfer(msg.value);
        unlistNFTByMarket(NFTId_); //将NFT从市场中移出
        _NFT.transferToBuyer(owner, msg.sender, NFTId_); //转移NFT所有权
        _NFT.updateArrays_trans(owner, msg.sender, NFTId_); //修改数组
        _lastDealTime[owner] = block.timestamp; //卖家上一次交易时间
        _lastDealTime[msg.sender] = block.timestamp; //买家上一次交易时间
        //更新交易数函数
        updateDeals(owner);
        updateDeals(msg.sender);
        //更新上次交易映射
        _lastDealUser[msg.sender] = owner;
        _lastDealUser[owner] = msg.sender;
        emit transferSuccess(owner, msg.sender, NFTId_, price);
    }

    //更新交易数
    function updateDeals(address user_) internal {
        if ((block.timestamp - _timer[user_]) <= 180 days) {
            _lastSixMonthsDeals[user_] += 1;
        } else {
            _lastSixMonthsDeals[user_] = 1;
            _timer[user_] = block.timestamp;
        }
    }

    //查询当前用户拥有的NFT数量
    function getOwnerNFTs() public view returns (uint[] memory) {
        return _NFT.getOwnerNFTs(msg.sender);
    }

    //评分
    function grade(uint score_) public onlyRegisted {
        require(
            _lastDealUser[msg.sender] != address(0),
            "There is nobody to grade!"
        );
        uint newScore = (computeGradeRate(msg.sender) * score_) / 100;
        _reputation[_lastDealUser[msg.sender]] += newScore;
        delete _lastDealUser[msg.sender];
        _graded[msg.sender] += 1;
        emit gradeSuccess();
    }

    //是否已评价
    function isGraded() public view returns (bool) {
        return _lastDealUser[msg.sender] == address(0);
    }

    //获取为自己评分的人数
    function getGrades() public view returns (uint) {
        return _graded[msg.sender];
    }

    //计算评分权重
    function computeGradeRate(address user_) internal view returns (uint) {
        uint weight_ = (_reputation[user_] * 50) /
            100 +
            (dealTimeMapping(user_) * 35) /
            100 +
            (dealsMapping(user_) * 15) /
            100;

        if (weight_ < 100) {
            return 50;
        } else if (weight_ >= 100 && weight_ < 200) {
            return 60;
        } else if (weight_ >= 200 && weight_ < 300) {
            return 70;
        } else if (weight_ >= 300 && weight_ < 400) {
            return 80;
        } else if (weight_ >= 400 && weight_ < 500) {
            return 90;
        } else {
            return 100;
        }
    }

    //计算交易时间映射
    function dealTimeMapping(address user_) internal view returns (uint) {
        uint interval_ = block.timestamp - _lastDealTime[user_];
        uint months = 30 days;
        uint Years = 365 days;

        if (interval_ < 1 * months) {
            return 0;
        } else if (interval_ >= 1 * months && interval_ < 3 * months) {
            return 100;
        } else if (interval_ >= 3 * months && interval_ < 6 * months) {
            return 200;
        } else if (interval_ >= 6 * months && interval_ <= 1 * Years) {
            return 300;
        } else if (interval_ >= 1 * Years && interval_ < 3 * Years) {
            return 400;
        } else {
            return 500;
        }
    }

    //获取上一次交易的时间
    function getLastDealTime() public view returns (uint) {
        return _lastDealTime[msg.sender];
    }

    //获取当前时间戳
    function getNowTime() public view returns (uint) {
        return block.timestamp;
    }

    //获取距离上一次交易的时间间隔
    function getInterval() public view returns (uint) {
        return block.timestamp - _lastDealTime[msg.sender];
    }

    //计算六个月内交易数映射
    function dealsMapping(address user_) internal view returns (uint) {
        uint deals_ = _lastSixMonthsDeals[user_];
        if (deals_ < 5) {
            return 0;
        } else if (deals_ >= 5 && deals_ < 10) {
            return 100;
        } else if (deals_ >= 10 && deals_ < 30) {
            return 200;
        } else if (deals_ >= 30 && deals_ < 100) {
            return 300;
        } else if (deals_ >= 100 && deals_ < 1000) {
            return 400;
        } else {
            return 500;
        }
    }

    //获取六个月内交易数
    function getDealsMapping() public view returns (uint) {
        return _lastSixMonthsDeals[msg.sender];
    }

    //计算奖励权重
    function computeRewordWeight(address user_) internal view returns (uint) {
        uint weight_ = _reputation[user_];
        require(weight_ >= 0 && weight_ <= 500);
        if (weight_ == 0) {
            return 0;
        } else if (0 < weight_ && weight_ < 200) {
            return 15;
        } else if (200 <= weight_ && weight_ < 350) {
            return 20;
        } else {
            return 25;
        }
    }

    //激励买家
    function rewardBuyer() public payable onlySeller {
        require(
            msg.value == (computeRewordWeight(msg.sender) * msg.value) / 1000,
            "Invalid amount!"
        );
        address lastBuyer_ = _lastDealUser[msg.sender];
        payable(lastBuyer_).transfer(msg.value);
        emit rewardBuyerSuccess(msg.sender, lastBuyer_);
    }

    //销毁NFT
    function burn(uint id_) public {
        _NFT.burnNFT(msg.sender, id_);
        emit burnNFTSuccess(id_);
    }
}
