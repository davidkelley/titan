module.exports = (pipeline, states) =>
  pipeline.reduce((def, { actions, name: stageName, ...structure }, i) => {
    const { actionStates, ...state } = states[i];
    return {
      ...def,
      [stageName]: {
        ...structure,
        ...state,
        actions: actions.reduce(
          (acc, { name, ...action }) => ({
            ...acc,
            [name]: {
              ...actionStates.find(({ actionName }) => actionName === name),
              ...action,
            },
          }),
          {}
        ),
      },
    };
  }, {});
