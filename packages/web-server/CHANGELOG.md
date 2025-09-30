# any-listen-web-server change log

All notable changes to this project will be documented in this file.

Project versioning adheres to [Semantic Versioning](http://semver.org/).
Commit convention is based on [Conventional Commits](http://conventionalcommits.org).
Change log format is based on [Keep a Changelog](http://keepachangelog.com/).

## [0.4.0](https://github.com/any-listen/any-listen-web-server/compare/v0.3.0...v0.4.0) - 2025-09-30

### Added

- Added **"Local List"** creation. You can create a local list via _List right-click menu > New List > Local List_. The local list will automatically update its content according to the songs in the directory created on your device.
- Added the creation of **"Remote List"**.
- Added basic support for reading and playing songs from **"WebDAV services"**. You can use this feature via _Playlist right-click menu > New Playlist > Remote Playlist_.
- Added **`httpProxy`** setting and **`HTTP_PROXY`** environment variable for configuring the proxy server. After setting the proxy server, all traffic will be forwarded to the proxy server.
- Added a **"Swap translated lyrics and romanized lyrics"** option in _Settings > Playback Settings_.
- Added a **"Bold lyrics font"** option in _Settings > Playback Details_. Enabled by default.
- Added support for reading and playing Any Listen lyrics tag data.

### Improved

- Improved the update notification mechanism. Now shows error messages when update checks or downloads fail ([#59](https://github.com/any-listen/any-listen/issues/59)).
- Improved lyrics display on the song details page for better readability.
- Improved the lyric scrolling speed when lyric scrolling is not delayed.
- Reset extension store cache on each page load.
- Improved song information matching and song tag information reading.

### Fixed

- Fixed an issue where lyrics from the previous song may still display when switching to a song without lyrics.
- Fixed a potential playlist synchronization issue.

### Changed

- Swapped the positions of **"Translated lyrics"** and **"Romanized lyrics"**. If you prefer the original order, you can enable the **"Swap translated lyrics and romanized lyrics"** option to revert.

---

### 新增

- 新增 **「本地列表」** 的创建，可通过 _列表右键菜单 > 新建列表 > 本地列表_ 创建，本地列表会自动跟随本机创建的列表歌曲目录内容更新
- 新增 **「远程列表」** 的创建
- 新增对 **「WebDAV 服务」** 内歌曲基本的读取与播放支持，可以在 _列表右键菜单 > 新建列表 > 远程列表_ 使用
- 新增 **`httpProxy`** 设置及 **`HTTP_PROXY`** 环境变量来设置代理服务器，设置代理服务器后所有流量将会被转发到代理服务器
- 新增 **「调换翻译歌词与罗马音歌词位置」** 选项，位于 _设置 > 播放设置_
- 新增 **「加粗歌词字体」** 选项，位于 _设置 > 播放详情页设置_，默认启用
- 新增 Any Listen 歌词标签数据读取与播放

### 优化

- 优化版本更新提示机制，增加检查和下载更新失败时的错误信息提示（[#59](https://github.com/any-listen/any-listen/issues/59)）
- 优化歌曲详情页的歌词显示效果，提升可读性
- 优化不延迟歌词滚动时的歌词滚动速度
- 每次加载页面时重置扩展商店缓存
- 优化歌曲信息匹配及歌曲标签信息读取

### 修复

- 修复从有歌词的歌曲切到无歌词的歌曲时，可能出现仍然显示上一首歌曲的歌词的问题
- 修复潜在播放列表同步问题

### 变更

- 调换 **「翻译歌词」** 和 **「罗马音歌词」** 的位置，若你想要恢复默认的行为，可开启 **「调换翻译歌词与罗马音歌词位置」** 选项

## [0.3.0](https://github.com/any-listen/any-listen-web-server/compare/v0.2.0...v0.3.0) - 2025-07-06

### Added

- Added lyric alignment setting on the playback details page
- Added Karaoke lyrics setting

### Optimized

- Adjusted the layout of control buttons on the playback bar
- Optimized the display effect of the changelog

### Fixed

- Fixed the issue where ambient sound effects failed to load

### Changed

- Updated default values for the playback details page, playback bar, and other default settings

---

### 新增

- 添加设置-播放详情页设置-歌词对齐方式设置
- 添加设置-播放设置-是否启用卡拉OK歌词设置

### 优化

- 调整播放栏控制按钮布局
- 优化更新日志显示效果

### 修复

- 修复环境音效加载失败的问题

### 变更

- 更新播放详情页、播放栏等默认设置的默认值

## [0.2.0](https://github.com/any-listen/any-listen-web-server/compare/v0.1.0...v0.2.0) - 2025-06-22

### Added

- Added the ability to add songs by selecting a folder, which will scan the selected directory and its subdirectories for songs
- Added extension management
- Added version checking
- Added icons to the navigation menu
- Improved proxy handling
- Added playback bar style settings
- Added extension icon display
- Added online extension store list loading and online extension installation/upgrading
- Added basic playback details page
- Added settings for playback details, playback settings for displaying lyric translations and romaji

### Improved

- Improved version check popup UI and fixed new version content display issues
- Improved virtual scrollbar appearance
- Updated scroll handling for better performance

### Fixed

- Fixed Flac file lyric reading issues
- Fixed issues when `allowPublicDir` is set to `/`
- Fixed music cover size issue in playback bar on Safari browser
- Fixed notification bubbles being covered by popups
- Fixed playlist synchronization issues
- Fixed played list update issues

---

### 新增

- 新增选择文件夹的方式添加歌曲，将会扫描所选目录及子目录内的歌曲
- 添加扩展管理
- 添加版本检查
- 为导航菜单添加图标
- 完善代理处理
- 新增播放栏样式设置
- 添加扩展图标显示
- 添加在线扩展商店列表加载与在线扩展安装、升级
- 添加基础的播放详情页
- 添加设置-播放详情设置，播放设置-显示歌词翻译、罗马音设置

### 优化

- 优化版本检查弹窗 UI 及修复新版本内容显示问题
- 优化虚拟滚动条显示效果
- 更新滚动处理以提高性能

### 修复

- 修复 Flac 文件歌词读取问题
- 修复 `allowPublicDir` 为 `/` 时出现的问题
- 修复 Safari 浏览器播放栏音乐图片大小问题
- 修复通知气泡被弹出层遮挡的问题
- 修复播放列表同步问题
- 修复已播放列表更新问题

## 0.1.0 - 2025-01-26

First version 🎉
