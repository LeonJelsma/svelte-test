var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/LeonJelsma/svelte-test.git',
        user: {
            name: 'Leon Jelsma',
            email: 'leonjelsma@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
