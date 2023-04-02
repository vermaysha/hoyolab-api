<div align="center">
  <h1>HoYoLab API - TypeScript/JavaScript HoYoLab API (ESM only)</h1>

  <p>
        <a href="https://github.com/vermaysha/hoyolab-api/actions/workflows/test.yml">
            <img src="https://img.shields.io/github/actions/workflow/status/vermaysha/hoyolab-api/test.yml?branch=master&amp;label=test&amp;style=flat-square" alt="GitHub Test Action Status">
        </a>
        <a href="https://github.com/vermaysha/hoyolab-api/actions/workflows/test.yml">
            <img src="https://raw.githubusercontent.com/vermaysha/hoyolab-api/gh-pages/badges.svg" alt="Coverage">
        </a>
        <a href="https://www.npmjs.com/package/@vermaysha/hoyolab-api">
            <img src="https://img.shields.io/npm/dt/@vermaysha/hoyolab-api.svg?style=flat-square" alt="Total Downloads">
        </a>
        <a href="LICENSE.md">
            <img src="https://img.shields.io/github/license/vermaysha/hoyolab-api?style=flat-square" alt="LICENSE">
        </a>
    </p>
    <p>
      <a href="https://www.npmjs.com/package/@vermaysha/hoyolab-api">
          <img src="https://img.shields.io/npm/v/@vermaysha/hoyolab-api.svg?style=flat-square" alt="Latest Version on Packagist">
      </a>
      <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/vermaysha/hoyolab-api/master?style=flat-square&label=github">
      <a href="https://github.com/vermaysha/hoyolab-api/releases/latest">
          <img src="https://img.shields.io/github/release-date/vermaysha/hoyolab-api?style=flat-square" alt="GitHub Release Date - Published_At">
      </a>
      <img alt="node-current" src="https://img.shields.io/node/v/@vermaysha/hoyolab-api?style=flat-square">
    </p>
</div>

Its unofficial HoYoLab API Wrapper for getting hoyoverse some in-game data, including Genshin Impact, Honkai Impact 3rd.

## Install

For NPM <br>
`npm install @vermaysha/hoyolab-api`

For Yarn <br>
`yarn install @vermaysha/hoyolab-api`

\*Note: _This library only support ESM Mode_

## Features

### HoYoLab API

| Features                                                                                                    | Status             |
| ----------------------------------------------------------------------------------------------------------- | ------------------ |
| Displays a list of owned HoYoVerse game accounts                                                            | :heavy_check_mark: |
| Displays the exploration history of the HoYoVerse game account that is owned according to the selected game | :heavy_check_mark: |

### Genshin Impact API

| Features                                                                                                                            | Status             |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Get detailed information of the selected account, including character, statistics and exploration history                           | :heavy_check_mark: |
| Get daily login information on the hoyolab page                                                                                     | :heavy_check_mark: |
| Get prize list information for daily login                                                                                          | :heavy_check_mark: |
| Make claims on daily login rewards                                                                                                  | :heavy_check_mark: |
| Gets a full list of acquired characters, including weapons and artifacts used and constellations that have been acquired            | :heavy_check_mark: |
| Get a list of daily resources including the daily resin that has been obtained, the status of transformation tools and teapot coins | :heavy_check_mark: |
| Get the history of obtaining primogems and mora through the Diary feature                                                           | :heavy_check_mark: |
| Obtain a complete history of the results of the current and previous Spiral Abyss challenge                                         | :heavy_check_mark: |
| Claim the redeem code provided                                                                                                      | :heavy_check_mark: |

## How to obtain HoYoLab Cookie

1. To begin, login with your [HoYoLab](https://www.hoyolab.com/home) Account or from [Battlepass](https://act.hoyolab.com/app/community-game-records-sea/index.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&gid=2&user_id=122516750&utm_source=hoyolab&utm_medium=gamecard&bbs_theme=light&bbs_theme_device=1#/ys).
2. Type `java` in the address bar followed by the script down below.
3. ```
   script:check = document.cookie.includes('ltoken') && document.cookie.includes('ltuid') || alert('Please logout and log back in before trying again, cookie is currently expired/invalid!'); cookie = document.cookie; check && document.write(`<p>${cookie}</p><br><button onclick="navigator.clipboard.writeText('${cookie}')">Click here to copy!</button><br>`)
   ```
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, you can copy your cookie

## Documentation

[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://vermaysha.github.io/hoyolab-api/stable/ 'Go to project documentation')

## License

@vermaysha/hoyolab-api
Copyright (C) 2022 Ashary Vermaysha

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
