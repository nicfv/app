import { F_P, P_F, A_F, F_A, A_P, P_A } from './tvm';

window.addEventListener('load', main);

function main(): void {
    const selector = document.getElementById('type') as HTMLSelectElement,
        typeLabel = document.getElementById('type_label') as HTMLLabelElement,
        inputLabel = document.getElementById('x_label') as HTMLLabelElement,
        outputLabel = document.getElementById('y_label') as HTMLLabelElement,
        num = (id: string) => +(document.getElementById(id) as HTMLInputElement).value,
        result = document.getElementById('y') as HTMLLabelElement;
    selector.addEventListener('input', changeValue);
    document.getElementById('i')!.addEventListener('input', changeValue);
    document.getElementById('n')!.addEventListener('input', changeValue);
    document.getElementById('x')!.addEventListener('input', changeValue);
    function changeValue() {
        switch (selector.value) {
            case ('P_F'): {
                typeLabel.innerText = 'Single payment present worth';
                inputLabel.innerText = 'Future worth, value, or amount [$]';
                outputLabel.innerText = 'Present worth, value, or amount';
                result.innerText = '$' + (P_F(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            case ('P_A'): {
                typeLabel.innerText = 'Uniform series present worth';
                inputLabel.innerText = 'Uniform amount per period [$]';
                outputLabel.innerText = 'Present worth, value, or amount';
                result.innerText = '$' + (P_A(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            case ('F_P'): {
                typeLabel.innerText = 'Single payment compound';
                inputLabel.innerText = 'Present worth, value, or amount [$]';
                outputLabel.innerText = 'Future worth, value, or amount';
                result.innerText = '$' + (F_P(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            case ('F_A'): {
                typeLabel.innerText = 'Uniform series compound';
                inputLabel.innerText = 'Uniform amount per period [$]';
                outputLabel.innerText = 'Future worth, value, or amount';
                result.innerText = '$' + (F_A(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            case ('A_F'): {
                typeLabel.innerText = 'Uniform series sinking fund';
                inputLabel.innerText = 'Future worth, value, or amount [$]';
                outputLabel.innerText = 'Uniform amount per period';
                result.innerText = '$' + (A_F(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            case ('A_P'): {
                typeLabel.innerText = 'Capital recovery';
                inputLabel.innerText = 'Present worth, value, or amount [$]';
                outputLabel.innerText = 'Uniform amount per period';
                result.innerText = '$' + (A_P(num('i') / 100, num('n')) * num('x')).toFixed(2);
                break;
            }
            default: {
                throw new Error('Invalid selection: ' + selector.value);
            }
        }
    }
    selector.value = 'F_P';
    changeValue();
}