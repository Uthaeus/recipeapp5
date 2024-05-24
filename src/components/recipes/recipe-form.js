import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

export default function RecipeForm({ recipe }) {
    const { categories } = useContext(RecipesContext);
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

  useEffect(() => {
    if (recipe) {
      reset(recipe);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
    }
  }, [recipe, reset]);

  

  const addIngredientHandler = () => {
    setIngredients([...ingredients, { ingredient, ingredientAmount }]);
    setIngredient("");
    setIngredientAmount("");
  };

  const addStepHandler = () => {
    setSteps([...steps, step ]);
    setStep("");
  };

  const selectCategoryHandler = e => {
    if (e.target.value === "other") {
      setCategoryToggle(true);
      reset({ category: "" });
    }
  }
  
  const closeSelectCategoryHandler = () => {
    setCategoryToggle(false);
    reset({ category: "" });
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              className="form-control"
              autoFocus={true}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
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
          <div className="form-group">
            <label htmlFor="category">Category</label>
            {!categoryToggle && <select className="form-select" {...register("category", { required: true })} onChange={selectCategoryHandler}>
              <option value="">select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="other">Other</option>
            </select>}
            {categoryToggle && (
                <>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="enter custom category"
                        {...register("category", { required: true })}
                    />
                    <p onClick={closeSelectCategoryHandler}>close</p>
                </>
            )}
            {errors.category && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="time">Approx. Time (in minutes)</label>
            <select className="form-select" {...register("time", { required: true })}>
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
            </select>
            {errors.time && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="ingredient">Ingredient</label>
            <input
              type="text"
              className="form-control"
              id="ingredient"
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="ingredient-amount">Amount</label>
            <input
              type="text"
              className="form-control"
              id="ingredient-amount"
              onChange={(e) => setIngredientAmount(e.target.value)}
              value={ingredientAmount}
            />
          </div>

          <p className="recipe-form-add-btn" onClick={addIngredientHandler}>
            Add Ingredient
          </p>
        </div>

        <div className="col-md-6">
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.ingredient} - {ingredient.ingredientAmount}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="step">Step</label>
            <textarea
              className="form-control"
              id="step"
              rows="3"
              onChange={(e) => setStep(e.target.value)}
              value={step}
            />
          </div>
          <p className="recipe-form-add-btn" onClick={addStepHandler}>
            Add Step
          </p>
        </div>

        <div className="col-md-6">
            <ul>
                {steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <button className="btn btn-primary">{ recipe ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
  );
}
