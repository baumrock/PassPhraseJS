# PassPhraseJS

Vanilla Javascript Random Passphrase Generator

<br>

## Demo

<img src=demo.png alt="PassPhraseJS Demo">

<br>

## Example

<a href="example.html">Also see the interactive example here!</a>

<br>

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