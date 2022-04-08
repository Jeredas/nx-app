import * as express from 'express';
import { Permission } from '@nx-test/shared-models';
import { Role } from '@nx-test/shared-models';

const testRoute = express.Router();

testRoute.post('/role/:roleName&:roleId', async (req, res) => {
  // @ts-ignore
  const { roleName, roleId } = req.params;
  let candidate;
  try {
    candidate = await Role.create({
      name: `${roleName}`,
      id: roleId,
    });
    res.send(candidate);
  } catch (err) {
    res.send(err);
  }
});

testRoute.post(
  '/permission/:permissionName&:permissionId',
  async (req, res) => {
    // @ts-ignore
    const { permissionName, permissionId } = req.params;
    let candidate;
    try {
      candidate = await Permission.create({
        name: `${permissionName}`,
        id: permissionId,
        description: 'Add products to the shop',
      });
      res.send(candidate);
    } catch (err) {
      res.send(err);
    }
  }
);

export default testRoute;
