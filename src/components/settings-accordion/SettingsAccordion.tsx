import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { PrimaryButton } from '../buttons/Buttons';
import { FadeInput } from '../input/Input';
import Loader from '../loader/Loader';

type SettingsAccordionProps = {
  settingsOpen: boolean;
  loading: boolean;
  previousOptions?: { fadeIn?: number; fadeOut?: number };
  fadeValues: {
    fadeIn: number;
    fadeOut: number;
  };
  setSettingsOpen: (value: boolean) => void;
  handleSave: () => void;
  setFadeValues: (value: { fadeIn: number; fadeOut: number }) => void;
};

export const SettingsAccordion = ({
  settingsOpen,
  loading,
  previousOptions,
  fadeValues,
  setSettingsOpen,
  handleSave,
  setFadeValues
}: SettingsAccordionProps) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-md mt-4 border-2 border-zinc-600 transition-all duration-300 ease-in-out">
      <div
        className="flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <div className="text-left font-semibold">Settings</div>
        {settingsOpen ? <IconChevronUp /> : <IconChevronDown />}
      </div>

      {/* Smooth Expand/Collapse */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          settingsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-1/2 text-left font-semibold">Fade In:</div>
            <FadeInput
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue === '' || /^-?\d*$/.test(inputValue)) {
                  setFadeValues({
                    ...fadeValues,
                    fadeIn: inputValue === '' ? 0 : Number(inputValue)
                  });
                }
              }}
              value={fadeValues.fadeIn}
            />
            <span>ms</span>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div className="w-1/2 text-left font-semibold">Fade Out:</div>
            <FadeInput
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue === '' || /^-?\d*$/.test(inputValue)) {
                  setFadeValues({
                    ...fadeValues,
                    fadeOut: inputValue === '' ? 0 : Number(inputValue)
                  });
                }
              }}
              value={fadeValues.fadeOut}
            />
            <span>ms</span>
          </div>

          <div className="flex justify-end mt-6">
            <PrimaryButton
              isDisabled={
                previousOptions?.fadeIn === fadeValues.fadeIn &&
                previousOptions?.fadeOut === fadeValues.fadeOut
              }
              onClick={handleSave}
            >
              {loading ? <Loader /> : <span>Save</span>}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
