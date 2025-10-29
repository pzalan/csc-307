import mut from './module.js';

test ('Testing sum -- success', () => {
   const expected = 30;
   const got = mut.sum(12, 18);
   expect(got).toBe(expected);});

test ('Testing div: dividing by zero', () => {
   const expected = Infinity;
   const got = mut.div(10,0);
   expect(got).toBe(expected);});

test ('Testing div: dividing zero by a number', () => {
   const expected = 0;
   const got = mut.div(0,100);
   expect(got).toBe(expected);});

test ('Testing div: normal div', () => {
   const expected = 5;
   const got = mut.div(10,2);
   expect(got).toBe(expected);});

test('Testing containsNumbers: empty string', () => {
   const expected = false;
   const got = mut.containsNumbers(' ');
   expect(got).toBe(expected);});

test('Testing containsNumbers: true', () => {
  const expected = true;
  const got = mut.containsNumbers("he11o");
  expect(got).toBe(expected);});

test('Testing containsNumbers: find bug', () => {
  const expected = true;
  const got = mut.containsNumbers("1");
  expect(got).toBe(expected);
}); 
