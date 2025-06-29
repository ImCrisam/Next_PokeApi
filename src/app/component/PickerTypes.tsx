import * as React from 'react';
import Autocomplete, { AutocompleteCloseReason } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

interface PickerTypesProps {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function PickerTypes({ options, value, onChange }: PickerTypesProps) {
  const [open, setOpen] = React.useState(false);
  const [pendingValue, setPendingValue] = React.useState<string[]>(value);

  React.useEffect(() => {
    setPendingValue(value);
  }, [value]);

  const handleClick = () => {
    setPendingValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    onChange(pendingValue);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box>
        <button onClick={handleClick}>Tipos</button>
        {value.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </Box>
      <Autocomplete
        open={open}
        multiple
        onClose={(
          event: React.ChangeEvent<{}>,
          reason: AutocompleteCloseReason,
        ) => {
          if (reason === 'escape') {
            handleClose();
          }
        }}
        value={pendingValue}
        onChange={(_, newValue) => setPendingValue(newValue)}
        disableCloseOnSelect
        renderValue={() => null}
        noOptionsText="No hay tipos"
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {selected ? '[x]' : '[ ]'} {option}
          </li>
        )}
        options={[...options].sort()}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder="Filtrar tipos"
          />
        )}
      />
    </React.Fragment>
  );
}
