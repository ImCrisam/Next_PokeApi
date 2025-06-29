import * as React from 'react';
import Autocomplete, { AutocompleteCloseReason } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';

interface TypeInfo {
  nameLocal: string;
  color: string;
}

interface PickerTypesProps {
  options: Map<string, TypeInfo>;
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

  const optionKeys = React.useMemo(() => Array.from(options.keys()), [options]);

  return (
    <React.Fragment>
      <Box>
        <button onClick={handleClick}>Tipos</button>
        {value.map((type) => (
          <span key={type} style={{
            background: options.get(type)?.color || '#e5e7eb',
            color: '#fff',
            borderRadius: 4,
            padding: '2px 8px',
            marginRight: 4,
            fontWeight: 600,
            textTransform: 'capitalize',
          }}>{options.get(type)?.nameLocal || type}</span>
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
            {selected ? '[x]' : '[ ]'}{' '}
            <span style={{
              background: options.get(option)?.color || '#e5e7eb',
              color: '#fff',
              borderRadius: 4,
              padding: '2px 8px',
              marginRight: 4,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}>{options.get(option)?.nameLocal || option}</span>
          </li>
        )}
        options={optionKeys.sort()}
        getOptionLabel={(option) => options.get(option)?.nameLocal || option}
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
