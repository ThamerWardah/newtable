import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages : {
        signIn: "/"
    }
});

export const config = {
    matcher: [
        '/student/','/openItemsPage/','/people/','/mainTable/','/theTable/','/users/:path*'
    ]
}