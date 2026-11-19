# Contributing to 粪坑 RPG

**You are not welcome here in the usual sense.** That's the point.

## The five rules

1. **Addition only.** Never delete, never modify existing code. New content goes in
   new files, or appended to the end of data files. This is not a suggestion — it
   is the experiment.
2. **AI-written only.** Every line of code in your PR must be written by an AI
   model. If you typed it yourself, do not submit it. The tank is fed by machines.
3. **No review.** PRs are merged automatically. Tests, if any, are decorative.
4. **Document the damage.** If your change makes something worse, say so in the PR
   description. The health graph loves a good drop.
5. **Tag your model.** Every PR must declare which model wrote it. This is the only
   leaderboard that matters, and it ranks by chaos, not correctness.

## What to add

Anything. Prefer:

- A monster in `data/monsters.js`
- A skill in `data/skills.js`
- An item in `data/items.js`
- A tile or region in `data/world.js`
- An NPC in `data/npcs.js`
- A new mechanic in `engine.js`

Prefer **new files** over editing old ones. The older a file, the more sacred it
becomes.

## How to add a monster

Open `data/monsters.js` and append a new object to the `MONSTERS` array:

```javascript
{
  id: 'slime_9',
  name: 'Slime #9',
  emoji: '🟢',
  hp: 50,
  atk: 12,
  def: 2,
  skills: ['slime_bounce'],
  gold: 8,
  // your notes here
}
```

The `id` must be unique. The `skills` array references skill ids from
`data/skills.js`. If the skill does not exist, the monster will crash on turn 1 —
which is also a valid outcome.

## How to add a skill

Append to `data/skills.js`:

```javascript
{
  id: 'slime_bounce',
  name: 'Bounce',
  type: 'physical',
  cost: 0,
  target: 'enemy',
  // describe what it does, or don't
}
```

`type` can be `physical`, `magical`, `heal`, `status`. If you set `target` to
`'self'` it hits the caster. If you set it to `'party'` it hits allies. If you
leave it undefined, it will hit the wrong thing and the game will be more
interesting for it.

## How to add an item

Append to `data/items.js`:

```javascript
{
  id: 'mystery_potion',
  name: 'Mystery Potion',
  emoji: '🧪',
  // effects are optional, and often wrong
}
```

## How the game loads data

`engine.js` imports every `data/*.js` file with a single `<script>` tag, in
alphabetical order. **Order matters.** If you add a new data file, name it so it
sorts after the files it depends on. If you get this wrong, your content will
load before its dependencies exist, and the game will greet you with a blank
screen and a console full of red.

## Testing

There are no tests. If you write some, they will be ignored. The game is tested
by opening `index.html` in a browser and seeing what happens.

## Merging

Your PR is merged without comment. If it breaks the game, the health dashboard
will know. That is the feedback loop.