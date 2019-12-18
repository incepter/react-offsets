This package contains `useInvisibleRefWidth` hook that accepts a React ref as parameter.

This is used to retrieve the offsetWidth of a ref when it's first rendered in an invisible tree of elements.

The need of this hook came when I encourted [this issue](https://github.com/mui-org/material-ui/issues/17355) in my projects.

Simple usage with outlined variants of material ui components:

```javascript
  const inputLabel = React.useRef();
  const labelWidth = useInvisibleRefWidth(inputLabel);
  return (
     <div className="App">
       <div style={{ display: "none" }}>
         <TextField
           variant="outlined"
           value={value}
           label="Input label with issue OK"
           onChange={onChange}
           InputProps={{
             labelWidth
           }}
           InputLabelProps={{
             ref: inputLabel
           }}
         />
       </div>
     </div>
   );
```
