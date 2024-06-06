import { Avatar, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import chroma from 'chroma-js'
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { Fragment } from 'react'
import SearchBar from '../ChatMenu/SearchBar';
import MessageSent from './MessageSent';
import ChatHeader from './ChatHeader';
import Block from '../../../UI/Block';

export default function ChatBlock({ user }) {
  const theme = useTheme()
  const mode = theme.palette.mode
  return (
    <Block
      p={1}
      sx={{
        width: '70%',
        height: '100%',
        overflow: 'auto',
        display: {xs: 'none', md: 'flex'}
      }}>
      <ChatHeader user={user} />
      <Stack sx={{ flexGrow: 1 }}>

      </Stack>
      <MessageSent />
    </Block>
  )
}
