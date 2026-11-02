pragma solidity ^0.8.20;

/// @title TransferLedger
/// @notice Forwards ETH to a recipient and stores a public record
///         (note + tag) of every transfer, so a front-end can render a feed.
contract TransferLedger {
    struct Record {
        address from;
        address to;
        uint256 value;
        uint64 sentAt;
        string note;
        string tag;
    }

    error ZeroAddress();
    error NoValue();
    error TextTooLong();
    error ForwardFailed();

    uint256 public constant MAX_TEXT_LENGTH = 140;

    Record[] private _records;

    event TransferRecorded(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint256 value,
        string note,
        string tag
    );

    /// @notice Send `msg.value` to `to` and log it on-chain in a single transaction.
    function send(address payable to, string calldata note, string calldata tag)
        external
        payable
        returns (uint256 id)
    {
        if (to == address(0)) revert ZeroAddress();
        if (msg.value == 0) revert NoValue();
        if (bytes(note).length > MAX_TEXT_LENGTH || bytes(tag).length > MAX_TEXT_LENGTH) {
            revert TextTooLong();
        }

        id = _records.length;
        _records.push(Record(msg.sender, to, msg.value, uint64(block.timestamp), note, tag));

        (bool ok, ) = to.call{value: msg.value}("");
        if (!ok) revert ForwardFailed();

        emit TransferRecorded(id, msg.sender, to, msg.value, note, tag);
    }

    /// @notice Total number of recorded transfers.
    function recordCount() external view returns (uint256) {
        return _records.length;
    }

    /// @notice Newest-first page of records.
    /// @param offset number of newest records to skip
    /// @param limit  maximum records to return
    function latest(uint256 offset, uint256 limit) external view returns (Record[] memory page) {
        uint256 total = _records.length;
        if (offset >= total) return new Record[](0);

        uint256 count = total - offset;
        if (count > limit) count = limit;

        page = new Record[](count);
        for (uint256 i = 0; i < count; i++) {
            page[i] = _records[total - 1 - offset - i];
        }
    }
}
