---
title: Docker で version `GLIBC_2.32' not found が出たのでなんとかした
category: 情報技術
tags:
  - docker
date: 2023-12-11
lastmod: 2023-12-29
---

新しい PC へ Docker Desktop をインストール・起動後、WSL で docker コマンドを実行すると下記のエラーが出力されて詰まった。

```shell
# WSL 環境にて docker コマンドを実行
$ docker
/mnt/wsl/docker-desktop/cli-tools/usr/bin/com.docker.cli: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found (required by /mnt/wsl/docker-desktop/cli-tools/usr/bin/com.docker.cli)
/mnt/wsl/docker-desktop/cli-tools/usr/bin/com.docker.cli: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.34' not found (required by /mnt/wsl/docker-desktop/cli-tools/usr/bin/com.docker.cli)
```

## 実行環境

- OS: Windows 11
    - Windows 環境へ Docker Desktop の最新版 (4.26.0) をインストールした。
- 実行環境: WSL (Ubuntu 20.04.6 LTS)
    - 通常 Docker Desktop を立ち上げた状態であれば WSL 環境にて Docker CLI が使用できるはずだが、前述のエラーが出力される。

## 原因

2023-12-04 にリリースされた最新バージョン 4.26.0 で、Linux ディストリビューションが古いバージョンだと不具合が存在するらしい。

- [Docker Desktop release notes \| Docker Docs](https://docs.docker.com/desktop/release-notes/#known-issues)

    > Known issues
    >
    > For Windows
    >
    > - Docker CLI doesn’t work when using WSL 2 integration on an older Linux distribution (for example, Ubuntu 20.04) which uses a `glibc` version older than `2.32`. This will be fixed in future releases. See  [docker/for-win#13824](https://github.com/docker/for-win/issues/13824).

## 解決方法

4.26.0 版を Windows 環境からアンインストールし、代わりに [4.25.2 版](https://docs.docker.com/desktop/release-notes/#4252) をインストールしたら解決した。

```shell
# 4.25.2 版を再インストール後、WSL 環境にて docker コマンドを実行
$ docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image
  ...
```

なおインストーラーは前述のリリースノートから入手できる。

## 参考文献

- [Update to 4.26.0 broke docker on WSL2 (Ubuntu 20.04) in Win11 · Issue #13824 · docker/for-win](https://github.com/docker/for-win/issues/13824)
    - リリースノートでリンクが貼られている issue 。
    - [4.25.2 版のインストールに関するコメント](https://github.com/docker/for-win/issues/13824#issuecomment-1846510859) を参考にした。
- [Docker Desktop for Windows をダウングレードしたい！ #docker-for-windows - Qiita](https://qiita.com/iwaiktos/items/b37a23598946e0db9bcb)

---

以上。日本語でこの件について書かれた記事が無かったようなので放流してみた。

とりあえず 4.26.1 版を待ってます～。

## (2023-12-28 追記) 修正版が配布された

前述の問題が修正された 4.26.1 版が配布されていたのでインストールした。

- [Docker Desktop release notes \| Docker Docs](https://docs.docker.com/desktop/release-notes/#4261)

    > Bug fixes and enhancements
    >
    > For Windows
    >
    > - Switch the CLI binaries to a version compatible with older versions of glibc, such as used in Ubuntu 20.04 fixes [docker/for-win#13824](https://github.com/docker/for-win/issues/13824)

![docker-4261](/assets/notes/2023-12-11-docker-desktop-4-26-0-issue/docker-4261.webp)

よかった～～。
