import React from "react"
import { MenuFoldOutlined } from "@ant-design/icons"
import { Menu, Dropdown, Button } from "antd"
import "./Header.css"

function Header() {
	const menu = (
		<Menu>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/">
					Home
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/newpost">
					Post
				</a>
			</Menu.Item>
			<Menu.Item>
				<a rel="noopener noreferrer" href="/profile">
					Profile
				</a>
			</Menu.Item>
			{/* <Menu.Item>
				<a rel="noopener noreferrer" href="/login">
					Login
				</a>
			</Menu.Item> */}
		</Menu>
	)
	return (
		<header className="App-header">
			<Dropdown overlay={menu} placement="bottomCenter" arrow>
				<Button
					className="dropdown-button"
					icon={<MenuFoldOutlined className="menu-icon" />}
				></Button>
			</Dropdown>
			<span className="App-title">Spotify Music Sharing</span>
		</header>
	)
}

export default Header
