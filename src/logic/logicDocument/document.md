# vscode-tetris 仕様書 ver 1.0.0

## 1. 概要
これはVisual Studio Code（以下vsode）の拡張機能でブロックゲームを作成するものである。

## 2. 要件仕様
### 2.1 機能要件
- ゲームのスタート
- ゲームの終了
- ゲームのポーズ機能
- ゲームのリセット機能

## 3. インターフェース要件
- 主にwebベースで構成する。

## 4. アーキテクチャ要件
### 4.1 言語
- TypeScript
- Javascript
- css

### 4.2 環境
#### 4.2.1 パッケージ
- npm

#### 4.2.2 エディタ
- vscode

#### 4.2.3 UML記述
- PlantUML

## 5. 開発担当
- Rerurate_514

## 6. 開発見込み期間
- 約1週間

## ex. 技術的仕様
### 

### monoのisBottomCollisionにおける詳細仕様
- monoごとにmonoの下限を動的に取得する。
- 設定されたmonoの下限に、地面か他の積みあがっているmonoが来たらisBottomCollisionをtrueとする。
- 遷移としてはisBottomCollisionがtrueになったならば次のmonoを降らす。

### monoのfieldArrayにおける数字の意味
- 0 何もないことを表す
- 1 欠番
- 2 ~ 7 は各monoに対応している