pragma solidity ^0.4.17;

contract Inbox
{
    string public message;
    
    function Inbox(string initMessage) public
    {
        message = initMessage;
    }
    
    function SetMessage(string newMessage) public
    {
        message = newMessage;
    }
}