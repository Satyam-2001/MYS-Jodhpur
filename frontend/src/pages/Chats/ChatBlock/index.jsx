
import React, { Fragment, useContext, useEffect, useState } from 'react'
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import { ElevatedStack } from '../../../UI/ElevatedComponents';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GetOtherUserData, LoadMessages, chatActions } from '../../../store/ChatSlice';
import { SocketContext } from '../../../context/SocketProvider';
import ChatBody from './ChatBody';

export default function ChatBlock() {
  const { socket, isConnected } = useContext(SocketContext)
  const { user } = useSelector(state => state.user)
  const { chats, open_chat_id } = useSelector(state => state.chats)
  const selected_chat = chats.find(chat => chat._id === open_chat_id)
  const { userId } = useParams()
  const dispatch = useDispatch()
  const oher_user = GetOtherUserData(user._id, selected_chat)

  useEffect(() => {
    if (!isConnected) return
    dispatch(LoadMessages({ userId }, socket))
    return () => {
      dispatch(chatActions.setOpenChat(null))
    }
  }, [userId, socket, isConnected])

  return (
    <ElevatedStack
      p={{ md: 1 }}
      sx={{
        borderRadius: { xs: 0, md: '10px' },
        width: { xs: '100%', md: '70%' },
        height: '100%',
        overflow: 'hidden',
      }}>
      <ChatHeader user={oher_user} />
      <ChatBody />
      <ChatFooter />
    </ElevatedStack>
  )
}
