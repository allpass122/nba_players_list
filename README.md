# NBA Players List

## 技術

- Front-end: `React`, `material-ui`(mui), `react-chartjs-2`, `axios`
- Back-end: `NodeJs`, `express`
- Database: `mysql`
- Other tool: `postman`, `MySQLWorkBench`

## 前置作業

1. git clone 後在 `/` 以及 `/backend` ：`yarn add` 或 `npm install`，缺什麼套件裝什麼。
2. 要先在本地的 mysql 資料庫創一個 database 及 table: players。這邊沒有程式化程式內也沒有用 variable 表示 config。
   附上我在 `MySQLWorkBench` 的程式碼。

```
CREATE DATABASE `nba`;
USE `nba`;
CREATE TABLE `players`(
	`name` VARCHAR(50) PRIMARY KEY,
    `team_acronym` VARCHAR(20),
    `team_name` VARCHAR(50),
    `games_played` INT,
    `minutes_per_game` VARCHAR(10),
    `field_goals_attempted_per_game` DECIMAL(3,1),
    `field_goals_made_per_game` DECIMAL(3,1),
    `field_goal_percentage` DECIMAL(4,1),
    `free_throw_percentage` DECIMAL(4,1),
    `three_point_attempted_per_game` DECIMAL(3,1),
    `three_point_made_per_game` DECIMAL(3,1),
    `three_point_percentage` DECIMAL(4,1),
    `points_per_game` DECIMAL(3,1),
    `offensive_rebounds_per_game` DECIMAL(3,1),
    `defensive_rebounds_per_game` DECIMAL(3,1),
    `rebounds_per_game` DECIMAL(3,1),
    `assists_per_game` DECIMAL(3,1),
    `steals_per_game` DECIMAL(3,1),
    `blocks_per_game` DECIMAL(3,1),
    `turnovers_per_game` DECIMAL(3,1),
    `player_efficiency_rating` DECIMAL(2,1)
);
```

3. 之後要跑的程式有三個
   1. 匯入資料： `importData.js` 可以在 backend 底下 `yarn data`
   2. 後端 server (api)： `api.js` 可以在 backend 底下 `yarn server`
   3. 前端： 在根目錄下 `yarn start`

## Main Flow

#### DB

1. 在本地端建立一個 mysql 資料庫（叫作`nba`），其中有 Table 叫作 `players`。

#### Backend

2. `importData.js` 會去連接資料庫，並且把 `players.json` 中的資料匯入表格，之後會出一份 `nba.sql` 檔案。
   沒意外的話 `importData.js` 只會需要跑一次。
3. `api.js` 會連接資料庫，並且提供 api。 目前只有兩個 GET method。 api 會依照需求對 mysql 做 query 並回傳結果。

#### Frontend

4. `App.js` 單純做一個 route。 分成 **main page** 和 **detail** 頁面。
5. `template.js` 是我們的 main page 主要物件、功能都在這裡。
6. 進入 main page 一開始會按照需求查詢所有球員資料。之後可以利用 Search 這個 button 做查詢。需注意以下幾點：
   - default value: team="ALL" , name=""。
   - team 跟 name 關係為 且(AND), name 為 substring 的查詢。
7. 資料呈現在下方的表格，使用 mui 提供的 DataGrid 這個 component。 其中包含了 _欄位排序_ 功能。
   這邊如果要自己實作可以用 button 結合 array 的 sort，但沒有特別寫。
   - 注意： 每次切 page 不會對 api 發 query，而是前端這邊自己 maintain. 只有 search 會重新要資料。
8. SHOWCHART 會按照需求秀出一個圓餅圖，每次 render 他都會跟 api 發一次請求並更新資料。
9. 按下 `detail` 的按鈕會 **navigate** 到 `/detail` 並利用傳入的 data id 列出詳細資料。

## 自己認為還能加強的地方

1. 排版
2. 安全性(sql injection 防範)
3. restful api 的設計
