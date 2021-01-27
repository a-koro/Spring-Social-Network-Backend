import React from 'react';
import GlobalContext from "../contexts/GlobalContext";
import Contact from "./Contact";
import Axios from 'axios';
import '../css/messenger.css';
import MessengerContact from "./MessengerContact";

export default function Messenger(props) {

    const {authenticatedUser} = React.useContext(GlobalContext);
    const {activeChat, setActiveChat} = React.useContext(GlobalContext);
    const {chatMessages, setChatMessages} = React.useContext(GlobalContext);
    const {connections} = React.useContext(GlobalContext);
    const [chats, setChats] = React.useState([]);

    function getChatMessages(userId) {
        Axios.get(`/messages/${userId}/${authenticatedUser.userId}`).then((response) => {
            setChatMessages(response.data);
        });
    }

    function getChats() {
        Axios.get('/messages/getChats').then((response) => {
            setChats(response.data);
            setActiveChat(response.data[0]);
            getChatMessages(response.data[0].userId);
        });
    }

    React.useEffect(() => {
        getChats();
    },[]);

    React.useEffect(() => {
        getChatMessages(activeChat.userId);
    },[activeChat]);

    return (
        <div className="col-lg-8 col-12 offset-lg-2 mt-5 pt-3">
            {/*Button trigger modal*/}
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                New Chat
            </button>

            {/*Modal*/}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 pr-0">
                    {
                        chats.map((chat) => (
                            <div>
                                <MessengerContact  contact={chat}/>
                            </div>
                        ))
                    }
                </div>
                <div className="col-8 border border-light tallDiv">
                    <Contact  userFriendId = {activeChat.userId} username={ activeChat.firstName + " " + activeChat.lastName}/>
                    { chatMessages.map((msg) => (
                        <h6>{msg.content}</h6>
                    ))}
                </div>
            </div>
        </div>
    );
}