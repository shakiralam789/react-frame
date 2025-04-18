"use client";
import { useState, useEffect } from "react";

export function useSignal(signal) {
  const [value, setValue] = useState(signal.value);
  
  useEffect(() => {
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    
    const unsubscribe = signal.subscribe(handleChange);
    
    setValue(signal.value);
    
    // Cleanup on unmount
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [signal]);
  
  return value;
}

export function useSignalState(signal) {
  const value = useSignal(signal);
  
  const setValue = (newValue) => {
    signal.value = newValue;
  };
  
  return [value, setValue];
}