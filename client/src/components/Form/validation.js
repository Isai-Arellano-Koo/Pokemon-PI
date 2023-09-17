export const validation = (dataForm, errors, setErrors) => {
  if (dataForm.name.length > 30) {
    setErrors({
      ...errors,
      name: "El nombre no puede superar los 30 caracteres",
    });
  } else if (/\d/.test(dataForm.name)) {
    setErrors({ ...errors, name: "El nombre no debe contener números" });
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN HEALTH
  if (dataForm.health && !/^\d+$/.test(dataForm.health)) {
    setErrors({ ...errors, health: "Solo se permiten números en este campo" });
  } else if (dataForm.health > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      health: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, health: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN ATTACK
  if (dataForm.attack && !/^\d+$/.test(dataForm.attack)) {
    setErrors({ ...errors, attack: "Solo se permiten números en este campo" });
  } else if (dataForm.attack > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      attack: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, attack: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN DEFENSE
  if (dataForm.defense && !/^\d+$/.test(dataForm.defense)) {
    setErrors({ ...errors, defense: "Solo se permiten números en este campo" });
  } else if (dataForm.defense > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      defense: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, defense: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN SPEED
  if (dataForm.speed && !/^\d+$/.test(dataForm.speed)) {
    setErrors({ ...errors, speed: "Solo se permiten números en este campo" });
  } else if (dataForm.speed > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      speed: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, speed: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN HEIGHT
  if (dataForm.height && !/^\d+$/.test(dataForm.height)) {
    setErrors({ ...errors, height: "Solo se permiten números en este campo" });
  } else if (dataForm.height > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      height: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, height: "" }));
  }

  // ! VALIDAR QUE SOLO ESCRIBA UN NUMERO EN WEIGHT
  if (dataForm.weight && !/^\d+$/.test(dataForm.weight)) {
    setErrors({ ...errors, weight: "Solo se permiten números en este campo" });
  } else if (dataForm.weight > 999) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      weight: "El número supera los limites establecidos",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, weight: "" }));
  }
  
  // ! VALIDAR QUE LA URL DE LA IMAGEN SEA CORRECTA
  if (dataForm.image) {
    // Expresión regular para buscar extensiones de imagen válidas
    const validImageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)/i;

    if (!validImageExtensions.test(dataForm.image)) {
      // Si la extensión no se encuentra en la URL, muestra un error
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: 'La URL de la imagen no es válida. Debe contener una extensión válida (jpg, jpeg, png, gif, bmp, webp).',
      }));
    } else {
      // La URL y la extensión de imagen son válidas
      setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
    }
  } else {
    // La URL de la imagen está vacía, no hay error
    setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
  }
};
