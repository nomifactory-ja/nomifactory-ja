# ルール

## セクション文字の代わりに HTML タグのようなものを利用する

セクション文字 `§` による文字列のスタイリングを行いたい場合、代わりに独自の HTML タグのようなものに置き換えてください。これは、制御の種類を指定する文字列と翻訳対象の文字列が隣接している関係で単語の識別がしづらい問題に対する対策と、DeepL が HTML タグをよしなに解釈してくれる挙動によるものです。ビルド時のタスクとして自動的にセクション文字を使用した形に置き換えられます。

### 例

```
§f
```

```
<ff>
```

## 改行命令の代わりに HTML タグのようなものを利用する

改行命令 `%n` による文字列の改行を行いたい場合、代わりに独自の HTML タグのようなもの `<nl>` に置き換えてください。これは、`n` と翻訳対象の文字列が隣接している関係で単語の識別がしづらい問題に対する対策と、DeepL が HTML タグをよしなに解釈してくれる挙動によるものです。ビルド時のタスクとして自動的にセクション文字を使用した形に置き換えられます。

### 例

```
`%n`
```

```
<nl>
```

## 大文字で始まっている単語は原則的にそのまま使用する

例えば `Applied Energistics 2` や `Wrought Iron` など、各単語が大文字で始まっている場合は翻訳後の文章でも同じ単語を使用します。これは、固有名詞が翻訳されていない場合が多く、クエストブック側でのみ翻訳されていた場合に混乱を生む可能性があるためです。

### 例

```
Wrought Iron is obtained simply by smelting Iron a second time. It has more durability than Iron, so it is better for making tools, but...
```

```
Wrought Ironは、Ironを2回精錬することで得られます。Ironよりも耐久性が高いので、道具を作るのに向いていますが...
```

## `questbook party` はそのまま使用する

`questbook party` は翻訳後の文章でも同じ単語を使用します。`questbook party` は小文字始まりの単語ですが、固有名詞でない線が捨てきれず、クエストブック側でのみ翻訳されていた場合に混乱を生む可能性があるためです。

### 例

```
If you're playing with friends, don't forget to invite them to the questbook party.
```

```
友達と一緒にプレイするなら、questbook partyに招待するのを忘れないようにしましょう。
```
