bootstrap-tabdrop
=================

This is a fork of Stefan Petre's bootstrap-tabdrop.js, the original of which can be found at http://eyecon.ro/bootstrap-tabdrop.

For use with the bootstrap tab component. Shows only the active tab and a dropdown which contains all tabs, when your tabs don't fit in a single row.

Works with horizontal tabs and pills.

## Dependencies

* [Bootstrap](http://twitter.github.com/bootstrap/) 2.0.4+
* [jQuery](http://jquery.com/) 1.7.1+

## Usage

Call the tabdrop via javascript on `.nav-tabs` and `.nav-pills` (as appropriate) with an optional options object:

```javascript
$('.nav-pills, .nav-tabs').tabdrop(options);
```

## Options

### text

Allows for customisation of the contents of the toggle anchor on the dropdown tab.

**Type:** `string`

**Default:** `More`

## Methods

### .tabdrop(options)

Initialises a tab drop.
```javascript
.tabdrop(options);
```

### .tabdrop('layout')

Will ensure that tabs are correctly displayed. This will happen automatically on window resize and when calling `tabdrop()`, but you can call it manually if you desire.
```javascript
.tabdrop('layout');
```