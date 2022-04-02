pragma solidity ^0.8.13;

contract Video {
    uint public videoCount = 0;
    string public name = "Video";
    mapping(uint => Video) public videos;

    struct Video {
        uint id;
        string hash;
        string title;
        address author;
    }

    event VideoUploaded(
        uint id,
        string hash,
        string title,
        address author
    );

    constructor() public {

    }

    function uploadVideo(string memory _videoHash, string memory _title) public {
        require();
        
        videoCount++;

        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);


    }

    emit VideoUploaded(videoCount, _videoHash, _titlem, msg.sender);
}
