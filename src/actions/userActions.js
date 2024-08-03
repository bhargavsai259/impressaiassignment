
export const getUsers = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:3000/users');
    const parsedResponse = await response.json();
    dispatch({
      type: 'LIST_USERS',
      payload: parsedResponse
    });
  } catch (e) {
    console.log(e);
  }
};

export const addUser = (payload) => async dispatch => {
  try {
    const response = await fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });
    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (id) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    if (response.ok) {
      dispatch({
        type: 'REMOVE_USER',
        payload: id
      });
      dispatch(getUsers());
    } else {
      console.log('Failed to delete user, status:', response.status);
    }
  } catch (e) {
    console.log('Error deleting user:', e);
  }
};

export const editUser = (id, payload) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const parsedResponse = await response.json();

    if (parsedResponse.success) {
      
      dispatch(getUsers());
    } else {
      console.error('Failed to edit user, response:', parsedResponse);
    }
  } catch (error) {
    console.error('Error editing user:', error);
  }
};