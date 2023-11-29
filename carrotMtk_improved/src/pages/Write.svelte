<script>
  import { getDatabase, ref, set } from "firebase/database";

  let title;
  let price;
  let description;
  let place;

function writeUserData(event) {
  const db = getDatabase();
push(ref(db, 'itmes/'), {
    title: title, 
    price: price, 
    description: description, 
    place: place,
  });
}
</script>

<form id="write_form" on:submit={|preventDefault= {writeUserData}}>
  <h1>Upload your item here</h1>
  <!-- <div>
    <label for="image">image</label>
    <input type="file" id="image" name="image" />
  </div> -->
  <div>
    <label for="title">title</label>
    <input type="text" id="title" name="title" bind:value={title}/>
  </div>
  <div>
    <label for="price">price</label>
    <input type="number" id="price" name="price" bind:value={price}/>
  </div>
  <div>
    <label for="description">description</label>
    <input type="text" id="description" name="description" bind:value={description}/>
  </div>
  <div>
    <label for="place">place</label>
    <input type="text" id="place" name="place" bind:value={place}/>
  </div>

  <!-- submit btn -->
  <div>
    <button class="submit_btn" type="submit">submit item</button>
  </div>
</form>
