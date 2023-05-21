# PassPhraseJS

Vanilla Javascript Random Passphrase Generator

## Demo

<img src=demo.png alt="PassPhraseJS Demo">

## Example

<a href="https://baumrock.github.io/PassPhraseJS/example.html">Also see the interactive example here!</a>

## Usage:

```html
<form>
  <input type="password">
  <p>
  Or use a random password:
  <a href="#" passphrasejs-renew="#pass">renew</a>
  <a href="#" passphrasejs-copyto="input[type=password]">
    <span id="pass" passphrasejs></span>
    (copy)
  </a>
</p>
</form>
<script src="./PassPhraseJS.js"></script>
<script>
const passphrase = new PassPhraseJS([
  'apple',
  'banana',
  'orange',
  'kiwi',
  'mango',
]);
</script>
```

## Where to get random words?

You can either use online tools like https://www.atatus.com/tools/random-word-generator or you can ask your preferred AI to create that array of words for you!

<img src=https://i.imgur.com/lqrHOws.png>
