import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { Header, themeOptions } from '../components'

export default {
  title: 'Idea-Factory/Header',
  component: Header
}

const Template = (args) => <Header {...args} />

export const LoggedOut = Template.bind({})

export const LoggedIn = Template.bind({})

LoggedIn.args = {
  user: 'data'
}
