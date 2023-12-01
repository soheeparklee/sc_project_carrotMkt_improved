<script>
  //footer 가져오기
  import Footer from '../components/Footer.svelte';

  //get item
  import { getDatabase, ref, push } from 'firebase/database';
  let title;
  let price;
  let description;
  let place;

  const storage = getStorage();
  const db = getDatabase();

  function writeUserData(imgUrl) {
    push(ref(db, 'items/'), {
      title: title,
      price: price,
      description: description,
      place: place,
      insertAt: new Date().getTime(),
      imgUrl: imgUrl,
    });
    window.location.hash = '/';
  }

  //get image
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from 'firebase/storage';

  let files;

  const uploadFile = async () => {
    const file = files[0];
    const name = file.name;
    const imgRef = refImage(storage, name);
    const res = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };

  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form id="write_form" on:submit|preventDefault={handleSubmit}>
  <h1>Upload your item here</h1>
  <div>
    <label for="image">image</label>
    <input type="file" id="image" name="image" bind:files />
  </div>
  <div>
    <label for="title">title</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="price">price</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="description">description</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="place">place</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>

  <!-- submit btn -->
  <div>
    <button class="submit_btn" type="submit">submit item</button>
  </div>
</form>

<Footer where="write" />

<style>
  .submit_btn {
    background-color: pink;
  }
</style>
