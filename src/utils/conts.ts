/**
 * @author      Nandani.V.Patel
 * @date        05 Feb 2025
 * @description Defines regular expression for validation.
 * @param
 * @response 
**/

// Regex for Email Address.
export const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Regex for Name.
export const noSpeacialCharRegx = /^[A-Za-z.]+$/i;
export const nameRegex = /^[A-Za-z.\s]+$/i;

// Regex for Password.
export const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

// Regex for Phone No.
export const phonenoRegx = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;