
import React, { Fragment, useContext, useEffect, useState } from 'react'
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import Block from '../../../UI/Block';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GetOtherUserData, LoadMessages } from '../../../store/ChatSlice';
import { SocketContext } from '../../../context/SocketProvider';
import ChatBody from './ChatBody';

export default function ChatBlock() {
  const { socket } = useContext(SocketContext)
  const { user } = useSelector(state => state.user)
  const { chats, selected_chat } = useSelector(state => state.chats)
  const { userId } = useParams()
  const dispatch = useDispatch()
  const oher_user = GetOtherUserData(user._id, selected_chat)

  useEffect(() => {
    if (!socket) return
    dispatch(LoadMessages({ userId }, socket))
  }, [userId, socket])

  return (
    <Block
      p={{ md: 1 }}
      sx={{
        width: { xs: '100%', md: '70%' },
        height: '100%',
        overflow: 'hidden',
        display: { md: 'flex' }
      }}>
      <ChatHeader user={oher_user} />
      <ChatBody />
      <ChatFooter />
    </Block>
  )
}
