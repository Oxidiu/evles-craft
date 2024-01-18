import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Oxidiu',
        email: 'ovidiu.radu.dev@gmail.com',
        password: bcrypt.hashSync('Kopandipec1531!?'),
        isAdmin: true,
    },
    {
        name: 'Aura',
        email: 'aurabembea24@gmail.com',
        password: bcrypt.hashSync('123456qwerty'),
        isAdmin: true,
    },
    {
        name: 'Ionica',
        email: 'ionica@gmail.com',
        password: bcrypt.hashSync('123456qwerty'),
        isAdmin: false,
    }

]

export default users
