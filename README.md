This package contains `useNodeOffsets` hook that accepts a React ref as parameter.
It returns the `{ offsetWidth, offsetHeight }` of the ref even it exists within an invisible tree of elements (default browser behavior : `{ offsetWidth: 0, offsetHeight: 0,}`)

This was first used to retrieve the offsetWidth of the input label of @material-ui's an outlined variants when it's first rendered in an invisible tree.
More info on [this issue](https://github.com/mui-org/material-ui/issues/17355).

Simple usage with outlined variants of material ui components:

```javascript
  import useNodeOffsets from 'react-offsets';
  const inputLabel = React.useRef();
  const labelOffsets = useNodeOffsets(inputLabel);
  return (
     <div className="App">
       <div style={{ display: "none" }}>
         <TextField
           variant="outlined"
           value={value}
           label="Input label with issue OK"
           onChange={onChange}
           InputProps={{
             labelWidth: labelOffsets.offsetWidth,
           }}
           InputLabelProps={{
             ref: inputLabel
           }}
         />
       </div>
     </div>
   );
```

Try it on [this sandbox](https://codesandbox.io/s/fast-fire-k5z04).
