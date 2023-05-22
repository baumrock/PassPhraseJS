# PassPhraseJS

Vanilla Javascript Random Passphrase Generator

## Demo

<img src=https://i.imgur.com/cCVtWqu.png alt="PassPhraseJS Demo">

## Usage:

You can add PassPhraseJS to any HTML page in seconds. Just add the following attributes to your markup:

- `passphrasejs`

  Will hold the random passphrase.

- `passphrasejs-copyto`

  Will copy the passphrase to the specified target/targets on click.
- `passphrasejs-renew`

  Will regenerate the passphrase in the target element on click.

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
<script src="/path/to/PassPhraseJS.min.js"></script>
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

## Example

<img src=https://i.imgur.com/UdtRUcQ.png>

<a href="https://baumrock.github.io/PassPhraseJS/example.html">Be sure to check out the interactive example here!</a>

## Where to get random words?

You can either use online tools like https://www.atatus.com/tools/random-word-generator or you can ask your preferred AI to create that array of words for you!

PassPhraseJS will take that array and double it by randomly using a lowercase or uppercase first letter of every word.

<img src=https://i.imgur.com/lqrHOws.png>
