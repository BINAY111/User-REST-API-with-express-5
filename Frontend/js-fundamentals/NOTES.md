// predicted

1 sync start
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
3 nextTick
2 sync inside async fn (before first await)
5b microtask: after await
6 macrotask: setTimeout 0
7 macrotask: setImmediate


// Actual output 

1 sync start
2 sync inside async fn (before first await)
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
5b microtask: after await
3 nextTick
6 macrotask: setTimeout 0
7 macrotask: setImmediate
