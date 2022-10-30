# advland-webpack

This project is a sample project you can clone and easily get a multi-file project setup going 
in [AdventureLand](https://adventure.land). With a very simple configuration you are able to 
have multiple files combined into one and have it get synced into your local Adventure Land 
installation for use in game.

## Configuration

There is an `advland-config.json` file that specifies how files should be copied. Here is two sample configurations:

### A generic slot configuration

```json
{
    "mode": "slot",
    "file": "Test.1.js"
}
```

The above configuration would update an existing script called Test in slot 1. Please create
the script with the same name and slot number as your config before using the copy functionality.

### A specific character's configuration

```json
{
    "mode": "character",
    "file": "Blademeister.4128489476123834.js"
}
```

You can find the file for your character under 
`C:\Users\<username>\AppData\Roaming\Adventure Land\autosync################\adventureland\characters` 
or by typing `/codes` in the chat window in AdventureLand.

## Installation

In the root directory of the project folder run the following command:

```
npm install
```

This will ensure you have all necessary dependencies to do building and copying.

## Copying

After completing the setup in the configuration section and the setup in the installation section, 
you should be able to start updating your scripts. To perform the build and copy run the following:

```
npm run build
```

## Caveats

### Global functions

Functions that are supposed to be global functions in your script like `on_cm` or `on_message` are
not necessarily going to be global functions after building. If you plan on using global functions
like those, then I recommend instead writing them like this:

```js
window.on_cm = function(..) { /* code */ };

window.on_message = function(..) {
    /* code */
};
```

Writing them like this will ensure that Adventure Land is able to load them regardless of how the
code is combined.
