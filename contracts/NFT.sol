// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    //计数器
    Counters.Counter _NFTIds;

    //NFT价格
    mapping(uint256 => uint256) private _price;

    //NFT名称
    mapping(uint => string) private _name;

    //NFT描述
    mapping(uint => string) private _description;

    //NFT所需信誉积分
    mapping(uint => uint) private _needReputation;

    //每位用户所拥有的NFT数量
    mapping(address => uint[]) _ownerToNFTs;

    //NFT的铸造/交易时间
    mapping(uint256 => uint256) _lastDealTime;

    //构造函数
    constructor() ERC721("myNFT", "BSNFT") {}

    //设置NFT价格
    function setPrice(uint256 id_, uint256 price_) public {
        _price[id_] = price_;
    }

    //获取NFT价格
    function getPrice(uint id_) public view returns (uint) {
        return _price[id_];
    }

    //设置NFT名字
    function setName(uint id_, string memory name_) internal {
        _name[id_] = name_;
    }

    //获取NFT描述
    function getDescription(uint id_) public view returns (string memory) {
        return _description[id_];
    }

    //设置NFT描述
    function setDescription(uint id_, string memory description_) internal {
        _description[id_] = description_;
    }

    //获取NFT所需信誉积分
    function getNeedReputation(uint id_) public view returns (uint) {
        return _needReputation[id_];
    }

    //设置NFT所需信誉积分
    function setNeedReputation(uint id_, uint score_) internal {
        _needReputation[id_] = score_;
    }

    function createNFT(
        address seller_,
        uint256 price_,
        string memory name_,
        string memory tokenURI_,
        string memory description_,
        uint needReputation
    ) external {
        _NFTIds.increment();
        uint256 NewTokenId_ = _NFTIds.current();
        _mint(seller_, NewTokenId_);
        setPrice(NewTokenId_, price_);
        _setTokenURI(NewTokenId_, tokenURI_);
        setName(NewTokenId_, name_);
        setDescription(NewTokenId_, description_);
        setNeedReputation(NewTokenId_, needReputation);
        _lastDealTime[NewTokenId_] = block.timestamp;
        updateArrays_mint(seller_, NewTokenId_);
    }

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
        return (
            ownerOf(NFTId_),
            _price[NFTId_],
            _name[NFTId_],
            tokenURI(NFTId_),
            _description[NFTId_],
            _needReputation[NFTId_]
        );
    }

    //与买家交易
    function transferToBuyer(address from, address to, uint256 NFTId) external {
        _transfer(from, to, NFTId);
    }

    //更改集合中的信息(交易时)
    function updateArrays_trans(address from, address to, uint id) public {
        uint[] storage array_From = _ownerToNFTs[from];
        uint[] storage array_To = _ownerToNFTs[to];
        for (uint i = 0; i < array_From.length; i++) {
            if (array_From[i] == id) {
                delete array_From[i];
                break;
            }
        }
        for (uint i = 0; i < array_To.length; i++) {
            if (array_To[i] == 0) {
                array_To[i] = id;
                return;
            }
        }
        array_To.push(id);
    }

    //更改集合中的信息(铸造时)
    function updateArrays_mint(address seller_, uint id_) public {
        uint[] storage array_ = _ownerToNFTs[seller_];
        for (uint i = 0; i < array_.length; i++) {
            if (array_[i] == 0) {
                array_[i] = id_;
                return;
            }
        }
        array_.push(id_);
    }

    ////更改集合中的信息(销毁时)
    function updateArrays_burn(address caller_, uint id_) public {
        uint[] storage array_ = _ownerToNFTs[caller_];
        for (uint i = 0; i < array_.length; i++) {
            if (array_[i] == id_) {
                delete array_[i];
                return;
            }
        }
    }

    //查询当前用户拥有的NFT数量
    function getOwnerNFTs(address owner) public view returns (uint[] memory) {
        return _ownerToNFTs[owner];
    }

    //销毁NFT
    function burnNFT(address caller_, uint id_) public returns (bool) {
        require(ownerOf(id_) == caller_, "You dont have permission to burn!");
        _burn(id_);
        updateArrays_burn(caller_, id_);
        return true;
    }
}
