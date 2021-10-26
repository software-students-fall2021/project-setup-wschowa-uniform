import React from 'react';
import { MailOutlined, AppstoreOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import "./Header.css"

function Header() {

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">
                    Home
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">
                    Post
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="">
                    Sign out
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <header className="App-header">
            <Dropdown overlay={menu} placement="bottomCenter" arrow>
                <Button className="dropdown-button" icon={<MenuFoldOutlined className="menu-icon"/>}></Button>
            </Dropdown>
            <span className="App-title">Spotify Music Sharing</span>
        </header>
    );
}

export default Header;