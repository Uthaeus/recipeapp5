import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function RecipeForm({ recipe }) {
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
  

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <input
              type="text"
              className="form-control"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              className="form-control"
              {...register("time", { required: true })}
            />
            {errors.time && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
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

        <div className="col-md-5">
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
        <div className="col-md-7">
          <div className="form-group mb-3">
            <label htmlFor="step">Step</label>
            <input
              type="text"
              className="form-control"
              id="step"
              onChange={(e) => setStep(e.target.value)}
              value={step}
            />
          </div>
          <p className="recipe-form-add-btn" onClick={addStepHandler}>
            Add Step
          </p>
        </div>

        <div className="col-md-5">
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
