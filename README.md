# X-carousel

This README outlines the details of collaborating on this Ember addon.

```hbs
{{#x-carousel on-slide-change=(action 'slide-changed') as |carousel|}}
  {{#carousel.slides as |slides|}}
    {{#slides.slide class="one"}}
      <a href="#meet-the-nest-protect" draggable="false">
        <span class="gallery-play-button"></span>
      </a>
    {{/slides.slide}}

		{{slides.slide class="two"}}

		{{slides.slide  class="three"}}
  {{/carousel.slides}}

  {{carousel.dots arrows=true on-click=(action 'dot-clicked')}}
{{/x-carousel}}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
