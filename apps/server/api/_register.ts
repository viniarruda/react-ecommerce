import * as moduleAlias from 'module-alias';
import * as path from 'path';

const srcDir = path.join(__dirname, '..', 'src');

moduleAlias.addAliases({
  '@user': path.join(srcDir, 'user'),
  '@auth': path.join(srcDir, 'auth'),
  '@shared': path.join(srcDir, 'shared'),
  '@product': path.join(srcDir, 'product'),
  '@store': path.join(srcDir, 'store'),
  '@utils': path.join(srcDir, 'utils'),
  '@category': path.join(srcDir, 'category'),
  '@cart': path.join(srcDir, 'cart'),
  '@order': path.join(srcDir, 'order'),
  '@review': path.join(srcDir, 'review'),
});
