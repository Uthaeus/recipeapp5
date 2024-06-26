import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

import { db, storage } from "../../firebase";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

import image from '../../assets/images/guest-icon-add.png';

export default function RecipeForm({ recipe }) {
  const { categories, addRecipe, updateRecipe } = useContext(RecipesContext);
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState("");
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [enteredImage, setEnteredImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (recipe) {
      reset(recipe);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);

      if (recipe.image) {
        setEnteredImage({url: recipe.image});
      }
    }
  }, [recipe, reset]);

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    // create url object
    const url = URL.createObjectURL(file);
    setEnteredImage({ url, file });
  }

  const removeImageHandler = () => {
    setEnteredImage(null);
  }

  const getImageUrlHandler = async () => {
    const imageName = enteredImage.file.name + Date.now();
    const imageRef = ref(storage, `images/${imageName}`);
    
    const snapshot = await uploadBytes(imageRef, enteredImage.file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  const openImageInputHandler = () => {
    document.getElementById('image-input').click();
  }

  const addIngredientHandler = () => {
    setIngredients([...ingredients, { ingredient, ingredientAmount }]);
    setIngredient("");
    setIngredientAmount("");
  };

  const removeIngredientHandler = (ingredient) => {
    setIngredients(ingredients.filter((i) => i.ingredient !== ingredient));
  }

  const addStepHandler = () => {
    setSteps([...steps, step]);
    setStep("");
  };

  const removeStepHandler = (step) => {
    setSteps(steps.filter((s) => s !== step));
  }

  const selectCategoryHandler = (e) => {
    if (e.target.value === "other") {
      setCategoryToggle(true);
      reset({ category: "" });
    }
  };

  const closeSelectCategoryHandler = () => {
    setCategoryToggle(false);
    reset({ category: "" });
  };

  const onSubmit = async (data) => {
    const newDate = new Date().toISOString().split('T')[0];
    let recipeId;
    let imageUrl = null;
    console.log('recipe form submit');

    if (recipe && enteredImage && enteredImage.url !== recipe.image) {
      imageUrl = await getImageUrlHandler();
      
      if (recipe.image !== null && recipe.image) {
        const imageRef = ref(storage, recipe.image);
        await deleteObject(imageRef);
      }
      
    } else if (recipe && enteredImage && enteredImage.url === recipe.image) {
      imageUrl = recipe.image;
    } else if (!recipe && enteredImage) {
      imageUrl = await getImageUrlHandler();
    }

    try {

      if (recipe) {
        recipeId = recipe.id;

        const newRecipe = {
          name: data.name,
          description: data.description,
          ingredients: ingredients,
          steps: steps,
          category: data.category,
          time: data.time,
          author: recipe.author,
          uid: recipe.uid,
          date: recipe.date,
          updated_at: newDate,
          image: imageUrl
        }

        await updateDoc(doc(db, "recipes", recipe.id), newRecipe);

        updateRecipe({ ...newRecipe, id: recipe.id });

      } else {
        const newRecipe = {
          name: data.name,
          description: data.description,
          ingredients: ingredients,
          steps: steps,
          category: data.category,
          time: data.time,
          author: user.username,
          uid: user.id,
          date: newDate,
          image: imageUrl
        }

        const docRef = await addDoc(collection(db, "recipes"), newRecipe);
        recipeId = docRef.id;
        addRecipe({ ...newRecipe, id: recipeId });
      }
    } catch (error) {
      console.log('recipe form submit error: ', error);
    } finally {
      navigate(`/recipes/${recipeId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-form">
      
      <div className="row">
        <div className="col-md-4">
          <div className="form-group mb-3">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              autoFocus={true}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            {!categoryToggle && (
              <select
                className="form-select"
                id="category"
                {...register("category", { required: true })}
                onChange={selectCategoryHandler}
              >
                <option value="">select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            )}
            {categoryToggle && (
              <>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  placeholder="enter custom category"
                  {...register("category", { required: true })}
                />
                <p onClick={closeSelectCategoryHandler} className="recipe-form-custom-category-close">revert to category list</p>
              </>
            )}
            {errors.category && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="time">Approx. Time (in minutes)</label>
            <select
              className="form-select"
              id="time"
              {...register("time", { required: true })}
            >
              <option value="">select time</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
              <option value="65">&gt; 60</option>
            </select>
            {errors.time && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="ingredient">Ingredient</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredient"
                  onChange={(e) => setIngredient(e.target.value)}
                  value={ingredient}
                />
              </div>
              <p className="recipe-form-add-btn mt-1" onClick={addIngredientHandler}>
                Add Ingredient &#62;&#62;
              </p>
            </div>
            <div className="col-md-4">

              <div className="form-group">
                <label htmlFor="ingredient-amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredient-amount"
                  onChange={(e) => setIngredientAmount(e.target.value)}
                  value={ingredientAmount}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="step">Step</label>
            <textarea
              className="form-control"
              id="step"
              rows="3"
              onChange={(e) => setStep(e.target.value)}
              value={step}
            />
          </div>
          <p className="recipe-form-add-btn mt-1" onClick={addStepHandler}>
            Add Step &#62;&#62;
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6">
          <p className="recipe-form-subtitle">Ingredients</p>

          {ingredients.length === 0 && <p className="recipe-form-none">No Ingredients Added</p>}
          
          {ingredients.map((ingredient, index) => (
            <div className="recipe-form-ingredient-item" key={index}>
              <p className="recipe-form-ingredient-item-ingredient">{ingredient.ingredient} - {ingredient.ingredientAmount}</p>
              
              <p className="recipe-form-custom-category-close" onClick={() => removeIngredientHandler(ingredient.ingredient)}>remove</p>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <p className="recipe-form-subtitle">Steps</p>
          {steps.length === 0 && <p className="recipe-form-none">No Steps Added</p>}
          
          {steps.map((step, index) => (
            <div key={index} className="recipe-form-step-item">
              <p className="recipe-form-step">{step}</p>
              <p className="recipe-form-custom-category-close" onClick={() => removeStepHandler(step)}>remove</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="row">
        <div className="col-md-8">
          <button className="recipe-form-btn">
            {recipe ? "Update Recipe" : "Add New Recipe"}
          </button>
        </div>

        <div className="col-md-4">
          <div className="recipe-form-image-container">
            <div className="recipe-form-image-input-wrapper" onClick={openImageInputHandler}>
              <img src={enteredImage ? enteredImage.url : image} alt="spaghetti" width='100%' />
              <p className="mt-2">Add Image</p>
              <input 
                type="file"
                id="image-input"
                className="d-none"
                onChange={imageChangeHandler}
              />
            </div>
            <p className="recipe-form-image-remove" onClick={removeImageHandler}>Reset Image</p>
          </div>
        </div>
      </div>
    </form>
  );
}
