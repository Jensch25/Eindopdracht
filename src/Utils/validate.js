export const validate = (e) => {
    const type = e.name;
    const value = e.value;
    let error = '';

    // eslint-disable-next-line default-case
    switch (type) {
        case 'firstName':
            if (!value) error = "First Name is required"
            break;
        case 'lastName':
            if (!value) error = "Last Name is required"
            break;
        case 'email':
            if (!value) error = "Email is required";
            if(value && !value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ) error = "Enter Valid Email" ;
            break;
        case 'password':
            if (!value) error = "Password is required"
            break;
        case 'search':
            if(!value) error = "Recipe is required"
            break;
        case 'health':
            if(!value) error = "Dietary is required"
            break;
        case 'recipe':
            if(!value) error = "Recipe is required"
            break;
        case 'dietary':
            if(!value) error = "Dietary is required"
            break;
    }
    console.log("🚀 ~ file: validations.js ~ line 38 ~ validate ~ {[type]:error}", {[type]:error})
    return {[type]:error}

}
