export function getCategoriesFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      db = e.target.result;
      db.createObjectStore('categories', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error');
      reject(e.target.error);
    };

    request.onsuccess = function (e) {
      db = e.target.result;
      tx = db.transaction('categories', 'readonly');
      store = tx.objectStore('categories');

      db.onerror = function (e) {
        console.log('error', e);
        reject(e.target.error);
      };

      const getAll = store.getAll();

      getAll.onsuccess = function () {
        resolve(getAll.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      db = e.target.result; // Use the existing db variable
      db.createObjectStore('categories', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error');
    };

    request.onsuccess = function (e) {
      db = e.target.result; // Use the existing db variable
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;

        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;

        case 'delete':
          store.delete(object._id);
          break;

        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
