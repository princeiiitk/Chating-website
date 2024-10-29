import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender, isSameSenderMargin, isSameUser, isLastMessage } from '../Utiles/Logic.js';
import './MessageHistory.css'; 

function MessageHistory({ messages }) {
    const activeUser = useSelector((state) => state.activeUser);

    return (
        <ScrollableFeed className='scrollbar-hide'>
            {messages &&
                messages.map((m, i) => (
                    <div className='flex items-center gap-x-[6px]' key={m._id}>
                        {(isSameSender(messages, m, i, activeUser.id) ||
                            isLastMessage(messages, i, activeUser.id)) && (
                                <div className="tooltip" style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            marginTop: "43px",
                                            marginRight: "6px",
                                            cursor: "pointer"
                                        }}
                                        src={m.sender?.profilePic}
                                        alt={m.sender?.name}
                                    />
                                    <span className="tooltiptext" style={{
                                        visibility: 'hidden',
                                        width: '120px',
                                        backgroundColor: 'black',
                                        color: '#fff',
                                        textAlign: 'center',
                                        borderRadius: '6px',
                                        padding: '5px 0',
                                        position: 'absolute',
                                        zIndex: '1',
                                        bottom: '125%', // Adjust based on your tooltip placement
                                        left: '50%',
                                        marginLeft: '-60px',
                                    }}>
                                        {m.sender?.name}
                                    </span>
                                </div>
                            )}
                        <span
                            className='tracking-wider text-[15px] font-medium'
                            style={{
                                backgroundColor: `${m.sender._id === activeUser.id ? "#268d61" : "#f0f0f0"}`,
                                marginLeft: isSameSenderMargin(messages, m, i, activeUser.id),
                                marginTop: isSameUser(messages, m, i, activeUser.id) ? 3 : 10,
                                borderRadius: `${m.sender._id === activeUser.id ? "10px 10px 0px 10px" : "10px 10px 10px 0"}`,
                                padding: "10px 18px",
                                maxWidth: "460px",
                                color: `${m.sender._id === activeUser.id ? "#ffff" : "#848587"}`
                            }}
                        >
                            {m.message}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
}


MessageHistory.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            sender: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string,
                profilePic: PropTypes.string,
            }).isRequired,
        })
    ).isRequired,
};

export default MessageHistory;
