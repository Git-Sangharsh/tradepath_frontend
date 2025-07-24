import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import axios from "axios";
import "./JournalModal.css";

const assetOptions = [
  { value: "NASDAQ", label: "NASDAQ" },
  { value: "S&P 500", label: "S&P 500" },
  { value: "BTC/USD", label: "BTC/USD" },
  { value: "ETH/USD", label: "ETH/USD" },
  { value: "XAU/USD", label: "XAU/USD" }, // Gold
  { value: "USOIL", label: "USOIL" },
  { value: "US30", label: "US30" },
  { value: "EUR/USD", label: "EUR/USD" },
  { value: "GBP/USD", label: "GBP/USD" },
  { value: "USD/JPY", label: "USD/JPY" },
  { value: "USD/CHF", label: "USD/CHF" },
  { value: "AUD/USD", label: "AUD/USD" },
  { value: "NZD/USD", label: "NZD/USD" },
  { value: "USD/CAD", label: "USD/CAD" },
];

const confluenceOptions = [
  { value: "FVG", label: "FVG" },
  { value: "CHoCH", label: "CHoCH" },
  { value: "Liquidity Sweep", label: "Liquidity Sweep" },
  { value: "MSS", label: "MSS" },
  { value: "Inverse FVG", label: "Inverse FVG" },
  { value: "BOS", label: "BOS" },
  { value: "Equilibrium", label: "Equilibrium" },
  { value: "Order Block", label: "Order Block" },
];

const directionOptions = [
  { value: "long", label: "Long" },
  { value: "short", label: "Short" },
];

const sessionOptions = [
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Asia", label: "Asia" },
];

const resultOptions = [
  { value: "win", label: "Win" },
  { value: "lose", label: "Lose" },
  { value: "break-even", label: "Break-even" },
];

const setupsOptions = [
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

const JournalModal = ({ onSubmit }) => {
  const isOpen = useSelector((state) => state.showJournalModal);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: "",
    direction: "long",
    asset: "",
    session: "New York",
    result: "win",
    pnl: 0,
    comments: "",
    confluences_used: [],
    setups: "A+",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, actionMeta) => {
    const { name } = actionMeta;
    const value = selected ? selected.value : "";
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfluencesChange = (selected) => {
    const values = selected ? selected.map((item) => item.value) : [];
    setFormData((prev) => ({ ...prev, confluences_used: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default at the top

    try {
      const token = localStorage.getItem("token"); // assuming you're storing JWT in localStorage

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/journal/journal`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Journal entry added:", res.data);
      // Close modal
      dispatch({ type: "SET_JOURNAL_MODAL", payload: false });
    } catch (err) {
      console.error(
        "Error while adding entry:",
        err.response?.data || err.message
      );
    }
  };


  const handleClose = () => {
    dispatch({ type: "SET_JOURNAL_MODAL", payload: false });
  };

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "#0a0a0a",
      borderColor: isFocused ? "#00ff9f" : "#333",
      boxShadow: isFocused ? "0 0 0 1px #00ff9f" : "none",
      color: "white",
      minHeight: "38px",
      cursor: "pointer",

      ":hover": {
        borderColor: "#00ff9f",
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#111",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#00ff9f",
      ":hover": {
        backgroundColor: "#00ff9f",
        color: "black",
        cursor: "pointer",
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#0a0a0a",
      zIndex: 9999,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#00ff9f55"
        : isFocused
        ? "#00ff9f33"
        : "#0a0a0a",
      color: "white",
      cursor: "pointer",
      transition: "none", // 🚫 disable hover/focus animation

      ":active": {
        backgroundColor: "#00ff9f55",
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#888",
    }),
  };

  const selectTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "#00ff9f33",
      primary: "#00ff9f",
      neutral0: "#0a0a0a",
      neutral80: "white",
      neutral20: "#333",
      neutral30: "#555",
    },
  });

  console.log(formData.date, formData.asset, formData.direction, formData.session, formData.result, formData.setups, formData.pnl, formData.confluences_used, formData.comments)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-wrapper"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="modal-title font-var">Add Journal Entry</h2>
            <form onSubmit={handleSubmit} className="font-var">
              <input
                className="font-var"
                type="date"
                name="date"
                onChange={handleChange}
                required
              />

              <div className="confluence-section">
                <label className="confluence-label">Asset</label>
                <Select
                  name="asset"
                  options={assetOptions}
                  value={assetOptions.find(
                    (option) => option.value === formData.asset
                  )}
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({
                      ...prev,
                      asset: selectedOption?.value || "",
                    }))
                  }
                  className="basic-single-select"
                  classNamePrefix="select"
                  theme={selectTheme}
                  styles={selectStyles}
                  isMulti={false}
                />
              </div>

              <div className="select-group">
                <label className="select-label">Direction</label>
                <Select
                  name="direction"
                  options={directionOptions}
                  defaultValue={directionOptions.find(
                    (option) => option.value === formData.direction
                  )}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  theme={selectTheme}
                  styles={selectStyles}
                />
              </div>

              <div className="select-group">
                <label className="select-label">Session</label>
                <Select
                  name="session"
                  options={sessionOptions}
                  defaultValue={sessionOptions.find(
                    (option) => option.value === formData.session
                  )}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  theme={selectTheme}
                  styles={selectStyles}
                />
              </div>

              <div className="select-group">
                <label className="select-label">Result</label>
                <Select
                  name="result"
                  options={resultOptions}
                  defaultValue={resultOptions.find(
                    (option) => option.value === formData.result
                  )}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  theme={selectTheme}
                  styles={selectStyles}
                />
              </div>
              <div className="select-group">
                <label className="select-label">Setups</label>
                <Select
                  name="setups"
                  options={setupsOptions}
                  defaultValue={setupsOptions.find(
                    (option) => option.value === formData.setups
                  )}
                  className="basic-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  theme={selectTheme}
                  styles={selectStyles}
                />
              </div>
              <div className="confluence-section">
                <p className="select-label">Profit/Loss</p>

                <input
                  type="number"
                  name="pnl"
                  placeholder="P&L"
                  onChange={handleChange}
                  className="font-var"
                />
              </div>

              <div className="confluence-section">
                <label className="confluence-label">Confluences Used</label>
                <Select
                  isMulti
                  name="confluences_used"
                  options={confluenceOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleConfluencesChange}
                  theme={selectTheme}
                  styles={selectStyles}
                />
              </div>

              <textarea
                name="comments"
                placeholder="Trade reasoning..."
                onChange={handleChange}
                className="font-var"
              />

              <button className="modal-submit font-var" type="submit">
                Submit Entry
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="cancel font-var"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JournalModal;
