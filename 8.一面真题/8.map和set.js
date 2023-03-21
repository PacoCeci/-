// ############ map #############
// ############ map #############
// ############ map #############

const map = new Map([
  ['name', 'Paco'],
  ['age', 100],
]);

map.set({ test: 123 }, 'this key is an object');

map.delete('age');
console.log(map.has('name'));
console.log(map.size);

map.forEach((value, key) => {
  console.log(key, '---', value);
});

// ############ set #############
// ############ set #############
// ############ set #############
const set = new Set([5, 3, 7, 2, 1]);
set.add(6);
set.delete(3);
console.log(set.has(5));
console.log(set.size);
set.forEach((val) => console.log(val));

// ############ weak map/set #############
// ############ weak map/set #############
// ############ weak map/set #############

const weakMap = new WeakMap();
const strongMap = new Map();
function fn() {
  const key = { k: 123 };
  weakMap.set(key, 'weakmap');
  strongMap.set(key, 'strongMap');
}

fn();
console.log('weakMap ', weakMap); // weakMap  WeakMap { <items unknown> }
console.log('strongMap ', strongMap); // strongMap  Map(1) { { k: 123 } => 'strongMap' }
